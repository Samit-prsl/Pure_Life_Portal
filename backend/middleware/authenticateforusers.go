package middleware

import (
	"fmt"
	"net/http"
	"os"

	initializers "restapi/code/Initializers"
	"restapi/code/models"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"

	"github.com/gin-gonic/gin"
)

func GetAuthenticatedUsers(c *gin.Context) {
	parts := strings.Split(c.GetHeader("Authorization"), " ")
	if len(parts) != 2 || parts[1] == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Message": "Unauthorized",
		})
		return
	}
	Authheader := parts[1]
	token, err := jwt.Parse(Authheader, func(token *jwt.Token) (interface{}, error) {

		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SECRET_KEY")), nil
	})
	if err != nil || token == nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid token",
		})
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		if claims["role"] != "user" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message": "This endpoint requires an attendee account",
			})
			return
		}
		var user models.User
		initializers.DB.Find(&user, claims["sub"])
		if user.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		c.Set("User", user)
		c.Next()
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid token",
		})
		return
	}

}

package controllers

import (
	"net/http"
	"os"
	initializers "restapi/code/Initializers"
	"restapi/code/models"
	"time"

	"github.com/golang-jwt/jwt/v5"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {
	var body struct {
		Email    string
		Password string
	}
	c.Bind(&body)
	var existinguser models.User
	initializers.DB.Find(&existinguser, "email = ?", body.Email)
	if existinguser.ID != 0 {
		c.JSON(401, gin.H{
			"message": "Email already taken",
		})
		return
	}
	hashed, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "Cant hash password",
		})
		return
	}
	user := models.User{Email: body.Email, Password: string(hashed)}
	result := initializers.DB.Create(&user)
	if result.Error != nil {
		c.Status(500)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "User created successfully",
	})
}

func Signin(c *gin.Context) {
	var body struct {
		Email    string
		Password string
	}
	c.Bind(&body)
	var user models.User
	initializers.DB.Find(&user, "email = ?", body.Email)
	if user.ID == 0 {
		c.JSON(403, gin.H{
			"message": "Invalid username or password",
		})
		return
	}
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		c.JSON(403, gin.H{
			"message": "Invalid username or password",
		})
		return
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	gettoken, err := token.SignedString([]byte(os.Getenv("SECRET_KEY")))

	if err != nil {
		c.JSON(500, gin.H{
			"message": "Cant assign tokens!",
		})
		return
	}
	c.JSON(200, gin.H{
		"token": gettoken,
	})
}

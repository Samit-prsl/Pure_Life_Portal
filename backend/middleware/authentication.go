package middleware

import "github.com/gin-gonic/gin"

func GetAuthenticated(c *gin.Context) {
	Authheader := c.GetHeader("Authorization")
	if Authheader != "" {
		return
	}
}

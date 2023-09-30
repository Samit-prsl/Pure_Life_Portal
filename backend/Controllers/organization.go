package controllers

import (
	"os"
	initializers "restapi/code/Initializers"
	"restapi/code/models"
	"time"

	"github.com/golang-jwt/jwt/v5"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func OrgSignup(c *gin.Context) {
	var body struct {
		Name     string
		Address  string
		Email    string
		Password string
	}
	c.Bind(&body)
	var ExistingOrg models.Organization
	initializers.DB.Find(&ExistingOrg, "email = ?", body.Email)
	if ExistingOrg.ID != 0 {
		c.JSON(401, gin.H{
			"Message": "Organization already exists!",
		})
		return
	}
	hashed, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
	if err != nil {
		c.JSON(500, gin.H{
			"Message": "Cant hash password",
		})
		return
	}
	NewOrg := models.Organization{Name: body.Name, Address: body.Address, Email: body.Email, Password: string(hashed)}
	result := initializers.DB.Create(&NewOrg)
	if result.Error != nil {
		c.JSON(500, gin.H{
			"Message": "Something Went Wrong",
		})
		return
	}
	c.JSON(200, gin.H{
		"Message":      "Organization signed up successfully",
		"Organization": NewOrg,
	})
}

func OrgSignin(c *gin.Context) {
	var body struct {
		Email    string
		Password string
	}
	c.Bind(&body)
	var Organization models.Organization
	initializers.DB.Find(&Organization, "email = ?", body.Email)
	if Organization.ID == 0 {
		c.JSON(403, gin.H{
			"Message": "Invalid email or password",
		})
		return
	}
	err := bcrypt.CompareHashAndPassword([]byte(Organization.Password), []byte(body.Password))
	if err != nil {
		c.JSON(403, gin.H{
			"Message": "Invalid Username or Password",
		})
		return
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": Organization.ID,
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

func Getorgs(c *gin.Context) {
	ID := c.Param("id")
	var Getorgs []models.Organization
	result := initializers.DB.Find(&models.Organization{}, ID).Preload("Events").Find(&Getorgs).Error
	if result != nil {
		c.JSON(500, gin.H{
			"Message": "Cant retrieve organizations",
		})
		return
	}
	c.JSON(200, gin.H{
		"User": Getorgs,
	})
}

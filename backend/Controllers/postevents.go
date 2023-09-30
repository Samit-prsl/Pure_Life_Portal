package controllers

import (
	initializers "restapi/code/Initializers"
	"restapi/code/models"

	"github.com/gin-gonic/gin"
)

func PostEvents(c *gin.Context) {
	Org, _ := c.Get("Organization")
	organization, err := Org.(models.Organization)
	if !err {
		c.Status(500)
		return
	}
	var body struct {
		Title    string
		Desc     string
		Address  string
		Date     string
		Strength uint
	}
	c.Bind(&body)
	event := models.Post{Title: body.Title, Desc: body.Desc, Address: body.Address, Date: body.Date, Strength: body.Strength}
	result := initializers.DB.Create(&event)

	if result.Error != nil {
		c.Status(500)
		return
	}
	c.JSON(200, gin.H{
		"message": event,
		"user":    organization,
	})

}

func GetEvents(c *gin.Context) {
	var Getevents []models.Post
	result := initializers.DB.Find(&Getevents)
	if result.Error != nil {
		c.Status(500)
		return
	}
	c.JSON(200, gin.H{
		"Events": Getevents,
	})
}

func GetEvent(c *gin.Context) {
	id := c.Param("id")
	var GetEvent models.Post
	result := initializers.DB.Find(&GetEvent, id)
	if result.Error != nil {
		c.Status(500)
		return
	}
	c.JSON(200, gin.H{
		"Event": GetEvent,
	})
}

func UpdateEvent(c *gin.Context) {
	id := c.Param("id")
	var event models.Post
	initializers.DB.Find(&event, id)
	var body struct {
		Title    string
		Desc     string
		Address  string
		Date     string
		Strength uint
	}
	c.Bind(&body)
	result := initializers.DB.Model(&event).Updates(models.Post{Title: body.Title, Desc: body.Desc, Address: body.Address, Date: body.Date, Strength: body.Strength})
	if result.Error != nil {
		c.Status(500)
		return
	}
	c.JSON(200, gin.H{
		"Event": event,
	})
}

func DeleteEvent(c *gin.Context) {
	id := c.Param("id")
	var event models.Post
	initializers.DB.Find(&event, id)
	result := initializers.DB.Delete(&event, id)
	if result.Error != nil {
		c.Status(500)
		return
	}
	c.JSON(200, gin.H{
		"message": "Deleted successfully!",
	})
}

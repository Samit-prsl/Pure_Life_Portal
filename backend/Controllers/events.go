package controllers

import (
	"strings"
	"time"
	"unicode/utf8"

	initializers "restapi/code/Initializers"
	"restapi/code/models"

	"github.com/gin-gonic/gin"
)

func validateEvent(title, desc, address, date string, strength uint) string {
	if n := utf8.RuneCountInString(strings.TrimSpace(title)); n < 3 || n > 100 {
		return "Title must be between 3 and 100 characters."
	}
	if n := utf8.RuneCountInString(strings.TrimSpace(desc)); n < 10 || n > 1000 {
		return "Description must be between 10 and 1000 characters."
	}
	if n := utf8.RuneCountInString(strings.TrimSpace(address)); n < 5 || n > 200 {
		return "Address must be between 5 and 200 characters."
	}
	parsed, err := time.Parse("02-01-2006", strings.TrimSpace(date))
	if err != nil {
		return "Enter a valid date in DD-MM-YYYY format."
	}
	now := time.Now()
	today := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.UTC)
	if parsed.Before(today) {
		return "The date cannot be in the past."
	}
	if strength < 1 || strength > 100000 {
		return "Capacity must be between 1 and 100000."
	}
	return ""
}

func PostEvents(c *gin.Context) {
	Org, err := c.Get("Organization")
	if !err {
		c.Status(403)
		return
	}
	var body struct {
		Title     string
		Desc      string
		Address   string
		Date      string
		Strength  uint
		OrgRefer  uint
		UserRefer uint
	}
	if err := c.ShouldBind(&body); err != nil {
		c.JSON(400, gin.H{"message": "Invalid request body."})
		return
	}
	if msg := validateEvent(body.Title, body.Desc, body.Address, body.Date, body.Strength); msg != "" {
		c.JSON(400, gin.H{"message": msg})
		return
	}
	body.OrgRefer = Org.(models.Organization).ID
	event := models.Post{Title: body.Title, Desc: body.Desc, Address: body.Address, Date: body.Date, Strength: body.Strength, OrgRefer: body.OrgRefer}
	result := initializers.DB.Create(&event)

	if result.Error != nil {
		c.Status(500)
		return
	}
	c.JSON(200, gin.H{
		"user": event,
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
	org, err := c.Get("Organization")
	if !err {
		c.Status(403)
		return
	}
	id := c.Param("id")
	var event models.Post
	initializers.DB.Find(&event, id)
	var body struct {
		Title    string
		Desc     string
		Address  string
		Date     string
		Strength uint
		OrgRefer uint
	}
	if err := c.ShouldBind(&body); err != nil {
		c.JSON(400, gin.H{"message": "Invalid request body."})
		return
	}
	if msg := validateEvent(body.Title, body.Desc, body.Address, body.Date, body.Strength); msg != "" {
		c.JSON(400, gin.H{"message": msg})
		return
	}
	body.OrgRefer = org.(models.Organization).ID
	result := initializers.DB.Model(&event).Updates(models.Post{Title: body.Title, Desc: body.Desc, Address: body.Address, Date: body.Date, Strength: body.Strength, OrgRefer: body.OrgRefer})
	if result.Error != nil {
		c.Status(500)
		return
	}
	c.JSON(200, gin.H{
		"Event": event,
	})
}

func DeleteEvent(c *gin.Context) {
	org, err := c.Get("Organization")
	if !err {
		c.Status(403)
		return
	}
	id := c.Param("id")
	var event models.Post
	initializers.DB.Find(&event, id)
	result := initializers.DB.Delete(&event, id)
	if result.Error != nil {
		c.Status(500)
		return
	}
	c.JSON(200, gin.H{
		"message":      "Deleted successfully!",
		"Organization": org,
	})
}

package controllers

import (
	initializers "restapi/code/Initializers"
	"restapi/code/models"

	"github.com/gin-gonic/gin"
)

func Booking(c *gin.Context) {
	ID := c.Param("id")
	User, err := c.Get("User")
	if !err {
		c.JSON(500, gin.H{
			"message": "User not found",
		})
		return
	}
	var post models.Post
	initializers.DB.Find(&post, ID)
	Userevent := models.UserEvent{
		UserId: User.(models.User).ID,
		PostId: post.ID,
	}
	result := initializers.DB.Create(&Userevent)
	if result.Error != nil {
		c.JSON(500, gin.H{
			"Message": "Cant update",
		})
		return
	}
	c.JSON(200, gin.H{
		"Message": "Event added to user db",
	})
}

func GetEventsFromUser(c *gin.Context) {
	User, err := c.Get("User")
	if !err {
		c.JSON(500, gin.H{
			"message": "User not found",
		})
		return
	}
	var UserEvents []models.UserEvent
	result := initializers.DB.Where("user_id = ?", User.(models.User).ID).Find(&UserEvents)
	if result.Error != nil {
		c.JSON(500, gin.H{
			"Message": "Cant find 🥲",
		})
		return
	}
	var responseData []map[string]interface{}

	for _, event := range UserEvents {

		eventData := map[string]interface{}{
			// "user_id": event.UserId,
			// "post_id": event.PostId,
		}

		var post models.Post
		result := initializers.DB.Where("id = ?", event.PostId).Find(&post)
		if result.Error != nil {
			c.JSON(500, gin.H{
				"Message": "Error retrieving Post data",
			})
			return
		}

		eventData["post_data"] = post
		responseData = append(responseData, eventData)
	}

	c.JSON(200, gin.H{
		"Message": responseData,
	})

}

func GetUserFromPosts(c *gin.Context) {
	ID := c.Param("id")
	var UserEvents []models.UserEvent
	//var Posts []models.Post
	result := initializers.DB.Where("post_id = ?", ID).Find(&UserEvents)
	if result.Error != nil {
		c.JSON(500, gin.H{
			"Message": "Cant find 🥲",
		})
		return
	}
	var responseData []map[string]interface{}

	for _, event := range UserEvents {

		eventData := map[string]interface{}{
			// "user_id": event.UserId,
			// "post_id": event.PostId,
		}

		var user models.User
		result := initializers.DB.Where("id = ?", event.UserId).Find(&user)
		if result.Error != nil {
			c.JSON(500, gin.H{
				"Message": "Error retrieving Post data",
			})
			return
		}

		eventData["user_data"] = user
		responseData = append(responseData, eventData)
	}

	c.JSON(200, gin.H{
		"Message": responseData,
	})
}

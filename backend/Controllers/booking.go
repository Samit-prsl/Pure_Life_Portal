package controllers

import (
	initializers "restapi/code/Initializers"
	"restapi/code/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func Booking(c *gin.Context) {
	ID := c.Param("id")
	Id, error := strconv.Atoi(ID)
	if error != nil {
		c.JSON(404, gin.H{
			"Message": "Cant take in the Id",
		})
		return
	}
	User, err := c.Get("User")
	if !err {
		c.JSON(500, gin.H{
			"message": "User not found",
		})
		return
	}

	var UserModel []models.UserEvent
	result := initializers.DB.Where("user_id = ?", User.(models.User).ID).Find(&UserModel)
	if result.Error != nil {
		c.JSON(500, gin.H{
			"Message": "Error at line 24",
		})
		return
	}

	for _, event := range UserModel {
		if event.PostId == uint(Id) {
			c.JSON(403, gin.H{
				"Message": "You cant overbook the already booked event!",
			})
			return
		}

	}
	var post models.Post
	initializers.DB.Find(&post, ID)

	if post.Strength == 1 {
		c.JSON(403, gin.H{
			"Message": "The event cannot add more number of users!",
		})
		return
	}

	Userevent := models.UserEvent{
		UserId: User.(models.User).ID,
		PostId: post.ID,
	}

	var body struct {
		Strength uint
	}
	c.Bind(&body)
	body.Strength = post.Strength - 1
	result3 := initializers.DB.Model(&post).Updates(models.Post{Strength: body.Strength})
	if result3.Error != nil {
		c.JSON(500, gin.H{
			"Message": "Cant update the strength",
		})
		return
	}

	result2 := initializers.DB.Create(&Userevent)

	if result2.Error != nil {
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

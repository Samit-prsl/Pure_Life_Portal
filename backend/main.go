package main

import (
	controllers "restapi/code/Controllers"
	initializers "restapi/code/Initializers"
	"restapi/code/middleware"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.DotEnvInit()
	initializers.DatabaseConnect()
}

func main() {
	r := gin.Default()
	r.POST("/register", controllers.Signup)
	r.POST("/login", controllers.Signin)
	r.POST("/orgRegister", controllers.OrgSignup)
	r.POST("/orgLogin", controllers.OrgSignin)
	r.POST("/postevent", middleware.GetAuthenticated, controllers.PostEvents)
	r.POST("/bookings/:id", middleware.GetAuthenticatedUsers, controllers.Booking)
	r.GET("/events", controllers.GetEvents)
	r.GET("/event/:id", controllers.GetEvent)
	r.GET("/userevent", middleware.GetAuthenticated, controllers.GetEventsFromUser)
	r.GET("/attendingusers/:id", middleware.GetAuthenticatedUsers, controllers.GetUserFromPosts)
	r.GET("/getorg/:id", middleware.GetAuthenticated, controllers.Getorgs)
	r.PUT("/updatevent/:id", middleware.GetAuthenticated, controllers.UpdateEvent)
	r.DELETE("/deletevent/:id", middleware.GetAuthenticated, controllers.DeleteEvent)
	r.Run()
}

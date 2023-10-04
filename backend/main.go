package main

import (
	// "log"
	// "net/http"
	controllers "restapi/code/Controllers"
	initializers "restapi/code/Initializers"
	"restapi/code/middleware"

	"github.com/gin-gonic/gin"
	"github.com/rs/cors"
)

func init() {
	initializers.DotEnvInit()
	initializers.DatabaseConnect()
}

func main() {
	r := gin.Default()

	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
	})
	cors.Handler(r)

	r.POST("/register", controllers.Signup)
	r.POST("/login", controllers.Signin)
	r.POST("/orgRegister", controllers.OrgSignup)
	r.POST("/orgLogin", controllers.OrgSignin)
	r.POST("/postevent", middleware.GetAuthenticated, controllers.PostEvents)
	r.POST("/bookings/:id", middleware.GetAuthenticatedUsers, controllers.Booking)
	r.GET("/events", controllers.GetEvents)
	r.GET("/event/:id", controllers.GetEvent)
	r.GET("/userevent", middleware.GetAuthenticatedUsers, controllers.GetEventsFromUser)
	r.GET("/attendingusers/:id", middleware.GetAuthenticated, controllers.GetUserFromPosts)
	r.GET("/getorg/:id", middleware.GetAuthenticated, controllers.Getorgs)
	r.PUT("/updatevent/:id", middleware.GetAuthenticated, controllers.UpdateEvent)
	r.DELETE("/deletevent/:id", middleware.GetAuthenticated, controllers.DeleteEvent)
	r.Run()
}

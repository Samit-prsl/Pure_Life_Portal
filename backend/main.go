package main

import (
	// "log"
	// "net/http"
	controllers "restapi/code/Controllers"
	initializers "restapi/code/Initializers"
	"restapi/code/middleware"

	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
)

func init() {
	initializers.DotEnvInit()
	initializers.DatabaseConnect()
}

func main() {
	r := gin.Default()
	r.Use(cors.AllowAll())

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
	r.GET("/getOrg", middleware.GetAuthenticated, controllers.Orgs)
	r.PUT("/updatevent/:id", middleware.GetAuthenticated, controllers.UpdateEvent)
	r.DELETE("/deletevent/:id", middleware.GetAuthenticated, controllers.DeleteEvent)
	r.Run()
}

// c := cors.New(cors.Options{
// 	AllowedOrigins:   []string{"http://localhost:3000"},
// 	AllowCredentials: true,
// 	AllowedHeaders:   []string{"Origin"},
// 	AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
// })

//r.Use(c)

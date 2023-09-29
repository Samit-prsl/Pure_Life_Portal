package main

import (
	controllers "restapi/code/Controllers"
	initializers "restapi/code/Initializers"

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
	r.POST("/postevent", controllers.PostEvents)
	r.GET("/events", controllers.GetEvents)
	r.GET("/event/:id", controllers.GetEvent)
	r.PUT("/updatevent/:id", controllers.UpdateEvent)
	r.DELETE("/deletevent/:id", controllers.DeleteEvent)
	r.Run()
}

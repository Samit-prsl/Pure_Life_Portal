package models

import "gorm.io/gorm"

type Organization struct {
	gorm.Model
	Name     string
	Address  string
	Email    string `gorm:"unique"`
	Password string
	Events   []Post `gorm:"foreignKey:OrgRefer"`
}

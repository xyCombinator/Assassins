package de.martin.craftnoteassassins.controller

import de.martin.craftnoteassassins.dtos.UserDTO
import de.martin.craftnoteassassins.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
class RegistrationController @Autowired constructor(val userService: UserService) {

    @PostMapping("/register")
    fun register(@RequestBody userDto: UserDTO): UserDTO {
        userService.registerUser(userDto)
        return userDto
    }


    @PostMapping("/users/{username}/circle/{circleId}/killVictim")
    fun killVictim(@PathVariable("username") username: String, @PathVariable("circleId") circle: String, principal: Principal): UserDTO?{
        if(username!=principal.name){
            return null
        }
        userService.killVictim(username, circle)
        return userService.findByUsername(principal.name)
    }

    @GetMapping("/users/{username}")
    fun getUser(@PathVariable("username") username: String, principal: Principal): UserDTO?{
        if(username!=principal.name){
            return null
        }
        val user = userService.findByUsername(principal.name)
        if(user === null){
            return null
        }
        return user

    }


}
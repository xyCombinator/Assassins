package de.martin.craftnoteassassins.controller

import de.martin.craftnoteassassins.dtos.UserDTO
import de.martin.craftnoteassassins.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
class RegistrationController @Autowired constructor(val userService: UserService) {

    @PostMapping("/register")
    fun register(@RequestBody userDto: UserDTO): UserDTO {
        userService.registerUser(userDto)
        return userDto
        return UserDTO("a", "b")
    }

    @PostMapping("/hello")
    fun sayHello(): String{
        return "hello !"
    }

}
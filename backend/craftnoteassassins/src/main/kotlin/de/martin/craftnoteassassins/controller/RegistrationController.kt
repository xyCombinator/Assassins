package de.martin.craftnoteassassins.controller

import de.martin.craftnoteassassins.dtos.UserDTO
import de.martin.craftnoteassassins.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
class RegistrationController @Autowired constructor(val userService: UserService) {

    @RequestMapping("/register", method = [RequestMethod.POST])
    fun register(@RequestBody userDto: UserDTO): UserDTO {
        userService.registerUser(userDto)
        return userDto
    }

}
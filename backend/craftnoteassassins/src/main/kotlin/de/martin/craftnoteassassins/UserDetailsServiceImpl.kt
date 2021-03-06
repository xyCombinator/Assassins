package de.martin.craftnoteassassins

import de.martin.craftnoteassassins.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import java.lang.RuntimeException

@Service
class UserDetailsServiceImpl  @Autowired constructor(val userService: UserService) : UserDetailsService{

    override fun loadUserByUsername(username: String): UserDetails {
        val user = userService.findByUsernameForPrincipal(username)
        if(user === null){
            throw RuntimeException("no name found")
        }
        return UserPrincipalImp(user)
    }

}
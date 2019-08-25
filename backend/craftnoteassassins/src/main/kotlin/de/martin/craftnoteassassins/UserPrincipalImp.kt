package de.martin.craftnoteassassins

import de.martin.craftnoteassassins.dtos.UserDTO
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.lang.RuntimeException
import java.util.*

class UserPrincipalImp(val user: UserDTO) : UserDetails {
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return Collections.emptyList()
    }

    override fun isEnabled(): Boolean {
        return true
    }

    override fun getUsername(): String {
        return user.name
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun getPassword(): String {
        val pwd = user.password
        if(pwd === null){
            throw RuntimeException("name was loaded without password")
        }
        return pwd
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

}

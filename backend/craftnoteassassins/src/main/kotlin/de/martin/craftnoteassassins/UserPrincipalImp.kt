package de.martin.craftnoteassassins

import de.martin.craftnoteassassins.dtos.UserDTO
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.util.*

class UserPrincipalImp(val user: UserDTO) : UserDetails {
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return Collections.emptyList()
    }

    override fun isEnabled(): Boolean {
        return true
    }

    override fun getUsername(): String {
        return user.user
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun getPassword(): String {
        return user.password
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

}

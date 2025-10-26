using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IAccountRepository _accountRepository;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager, IAccountRepository accountRepository)
        {
            _signInManager = signInManager;
            _tokenService = tokenService;
            _userManager = userManager;
            _accountRepository = accountRepository;
        }
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            var result = await _accountRepository.SendResetPasswordEmailAsync(forgotPasswordDto);
            if (!result)
            {
                return BadRequest("Error sending reset password email.");
            }
            return Ok("Reset password email sent successfully.");
        }
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var result = await _accountRepository.ResetPasswordAsync(resetPasswordDto);
            if (!result)
            {
                return BadRequest("Error resetting password.");
            }
            return Ok("Password reset successfully.");
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var user = await _userManager.FindByEmailAsync(loginDto.Email);
                if (user == null)
                {
                    return Unauthorized("Invalid User");
                }
                var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
                if (!result.Succeeded)
                {
                    return Unauthorized("Invalid Password");
                }
                return Ok(new NewUserDto
                {
                    FullName = user.FullName,
                    Email = user.Email,
                    Token = await _tokenService.CreateToken(user)
                }); 
                
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request: " + ex.Message);
            }
        }
        
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var user = new AppUser
                {
                    FullName = registerDto.FullName,
                    Email = registerDto.Email,
                    UserName = registerDto.Email,
                    PhoneNumber = registerDto.PhoneNumber,
                    DateOfBirth = registerDto.DateOfBirth
                };
                var existingEmail = await _userManager.FindByEmailAsync(registerDto.Email);
                if (existingEmail != null)
                {
                    return BadRequest("Email is already registered.");
                }
                var phoneExists = await _userManager.Users.AnyAsync(u => u.PhoneNumber == registerDto.PhoneNumber);
                if (phoneExists)
                {
                    return BadRequest("Phone number is already registered.");
                }
                var createUser = await _userManager.CreateAsync(user, registerDto.Password);
                if (!createUser.Succeeded)
                {
                    var errors = createUser.Errors.Select(e => e.Description);
                    return BadRequest(new { Errors = errors });
                }
                var roleResult = await _userManager.AddToRoleAsync(user, "User");
                if (!roleResult.Succeeded)
                {
                    var errors = roleResult.Errors.Select(e => e.Description);
                    return BadRequest(new { Errors = errors });
                }
                return Ok(
                    new NewUserDto
                    {
                        FullName = user.FullName,
                        Email = user.Email,
                        Token = await _tokenService.CreateToken(user)

                    }
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request: " + ex.Message);
            }
            
        }

    }
}
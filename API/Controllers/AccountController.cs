using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;

        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.Users.Include(p=>p.Photos).FirstOrDefaultAsync(x=>x.Email == loginDTO.Email);
            if (user == null) return Unauthorized();
            var result = await _userManager.CheckPasswordAsync(user, loginDTO.Password);
            if (result)
            {
                return new UserDTO
                {
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = _tokenService.CreateToken(user),
                    UserName = user.UserName,
                };
            }
            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await _userManager.Users.AnyAsync(u => u.UserName == registerDTO.UserName))
            {
                ModelState.AddModelError("email","Email taken");
                return ValidationProblem();
            }
            if (await _userManager.Users.AnyAsync(u => u.Email == registerDTO.Email))
            {
                 ModelState.AddModelError("username","Username taken");
                return ValidationProblem();
            }
            var user = new AppUser
            {
                DisplayName = registerDTO.DisplayName,
                UserName = registerDTO.UserName,
                Email = registerDTO.Email,
            };
            var result = await _userManager.CreateAsync(user, registerDTO.Password);
            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }
            return BadRequest("problem registering user");
        }


        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetCurrentuser()
        {
            var user = await _userManager.Users.Include(p=>p.Photos).FirstOrDefaultAsync(x=>x.Email==User.FindFirstValue(ClaimTypes.Email));
            return CreateUserObject(user);
        }
        private UserDTO CreateUserObject(AppUser user)
        {
            return new UserDTO
            {
                DisplayName = user.DisplayName,
                Image = user.Photos.FirstOrDefault(x=>x.IsMain)?.Url,
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user),
            };
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountManager:ControllerBase
    {
        private readonly IAccountManager _accountManager;
        public AccountManager(IAccountManager accountManager)
        {
            _accountManager = accountManager;
        }
        [HttpPost("create")]
        public async Task<IActionResult> CreateAccountStaff(CreateStaffDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var staff = await _accountManager.CreateStaffAsync(dto);
                return Ok(staff);
                
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
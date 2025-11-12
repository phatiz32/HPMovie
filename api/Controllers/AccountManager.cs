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

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPost("import-account")]
        public async Task<IActionResult> CreatebyExcel([FromForm] ImportStaffFileDto dto)
        {
            Console.WriteLine("===> Import Excel API called <===");

            try
            {
                await _accountManager.ImportCreateStaff(dto.File);
                return Ok(new { message = "Import successfully" });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("staff")]
        public async Task<IActionResult> getStaffAccount()
        {
            var listStaff = await _accountManager.GetStaffAccount();
            return Ok(listStaff);
        }
        [HttpDelete("{accountId}")]
        public async Task<IActionResult> DeleteAccountAsyn(string accountId)
        {
            try
            {
                var account = await _accountManager.DeleteAccountAsync(accountId);
                return Ok(account);
                
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

    }
}
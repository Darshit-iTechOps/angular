using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using testproject.api.DTOs;
using testproject.api.Models;
using testproject.api.Services;
using testproject.models.Employees;
using testproject.models.Roles;

namespace testproject.api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{
    private readonly JwtSettings _jwtSettings;
    private readonly IEmployeeService _employeeService;
    public LoginController(IEmployeeService employeeService, IOptions<JwtSettings> jwtSettings)
    {
        _jwtSettings = jwtSettings.Value;
        _employeeService = employeeService;
    }

    [AllowAnonymous]
    [HttpPost]
    public IActionResult Login(Login login)
    {
        var user = Authenticate(login);
        if (user != null)
        {
            var token = Generate(user);
            return Ok(new { token = token, user = Response(user) });
        }
        return NotFound("User not found");
    }
    [NonAction]
    private string Generate(Employee employee)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_jwtSettings.SecretKey);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]{
            new Claim(ClaimTypes.Email, employee.Email),
            new Claim(ClaimTypes.Role, employee.Role.Name),
            }),
            Expires = DateTime.Now.AddDays(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    [NonAction]
    private Employee Authenticate(Login login)
    {
        var currentUser = _employeeService.GetCurrentUser(login.Email, login.Password);
        if (currentUser != null)
        {
          return currentUser;
        }
        return null;
    }

    [NonAction]
    private new EmployeePartialResponse Response(Employee employee)
    {
      try
      {
        return new EmployeePartialResponse(
            employee.EmpId,
            employee.FirstName,
            employee.LastName,
            employee.TelNo,
            employee.Email,
            new RoleResponse(employee.Role.RoleID, employee.Role.Name),
            employee.ManagerId,
            employee.DeptId,
            employee.Status
        );
      }
      catch
      {
          return null;
      }
    }
}

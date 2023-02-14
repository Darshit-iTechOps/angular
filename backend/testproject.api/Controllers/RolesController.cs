using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using testproject.api.Models;
using testproject.api.Services;
using testproject.models.Roles;

namespace testproject.api.Controllers
{
  [Authorize]
  [ApiController]
  [Route("api/[controller]")]
  public class RolesController : Controller
  {
    private readonly IRoleService service;
    public RolesController(IRoleService service) =>
      this.service = service;

    [HttpGet]
    [AllowAnonymous]
    public IActionResult GetRoles()
    {
      return Ok(service.GetAllRole());
    }

    [AllowAnonymous]
    [HttpGet("{id:int}")]
    public IActionResult GetRole(int id)
    {
      return Ok(service.GetRole(id));
    }

    [HttpPost]
    [Authorize(Roles = "Manager, HR")]
    public IActionResult AddEditRole(CreateEditRoleRequest request)
    {
      var role = Request(request);
      service.CreateEditRole(role);
      return CreatedAtAction(
          nameof(GetRole),
          routeValues: new { id = role.RoleID },
          role
      );
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Manager, HR")]
    public IActionResult DeleteRole(int id)
    {
      service.DeleteRole(id);
      return Ok();
    }

    [NonAction]
    private static new Role Request(CreateEditRoleRequest request) =>
      new Role(request.RoleID, request.Name);
  }

}

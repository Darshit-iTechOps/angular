using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using testproject.api.Models;
using testproject.api.Services;
using testproject.models.Departments;

namespace testproject.api.Controllers;

[Authorize(Roles = "Employee, Manager, HR")]
[ApiController]
[Route("/api/[controller]")]
public class DepartmentsController : ControllerBase
{
  private readonly IDepartmentService _departmentService;
  public DepartmentsController(IDepartmentService departmentService) =>
    _departmentService = departmentService;

  [HttpGet]
  [AllowAnonymous]
  public IActionResult GetAllDepartments()
  {
    List<Department> departments = _departmentService.GetAllDepartments();
    return Ok(departments);
  }

  [HttpGet("{id:int}")]
  [AllowAnonymous]
  public IActionResult GetSingleDepartments(int id)
  {
    Department department = _departmentService.GetDepartment(id);
    var response = GetResponse(department);
    return Ok(response);
  }


  [HttpPost("{id:int?}")]
  [Authorize(Roles = "Managers, HR")]
  public IActionResult CreateEditDepartment(int id, CreateEditDepartmentRequest request)
  {
    var department = new Department();
    if (id != 0)
      department = UpdateEmployee(id, request);
    else
      department = CreateEmployee(request);

    _departmentService.CreateEditDepartment(id, department);

    var response = GetResponse(department);
    return CreatedAtAction(
        nameof(GetAllDepartments),
        routeValues: new { id = department.DeptId },
        response
    );
  }
  [NonAction]
  private static DepartmentResponse GetResponse(Department department)
  {
    return new DepartmentResponse(
        department.DeptId,
        department.Name,
        department.ManagerId,
        department.Status);
  }
  [NonAction]
  private static Department CreateEmployee(CreateEditDepartmentRequest request)
  {
    return new Department
    {
      Name = request.Name,
      ManagerId = request.ManagerId == 0 ? null : request.ManagerId,
      Status = true,
    };
  }
  [NonAction]
  private static Department UpdateEmployee(int id, CreateEditDepartmentRequest request)
  {
    return new Department
    {
      DeptId = id,
      Name = request.Name,
      ManagerId = request.ManagerId == 0 ? null : request.ManagerId,
      Status = request.Status
    };
  }
}

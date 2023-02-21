using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using testproject.api.Models;
using testproject.api.Services;
using testproject.models.Departments;
using testproject.models.Employees;

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
    var list = GetListResponse(departments);
    return Ok(list);
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
      department = UpdateDepartment(id, request);
    else
      department = CreateDepartment(request);

    _departmentService.CreateEditDepartment(id, department);
    var newDepartment = _departmentService.GetDepartment(id);
    var response = GetResponse(newDepartment);
    return CreatedAtAction(
        nameof(GetAllDepartments),
        routeValues: new { id = response.DeptId },
        response
    );
  }

  [HttpPut("{id:int}")]
  [Authorize(Roles = "Manager, HR")]
  public IActionResult UpdateDepartmentStatus(int id)
  {
    var department = _departmentService.GetDepartment(id);
    department.Status = !department.Status;
    _departmentService.UpdateDepartmentStatus(department);
    var response = GetResponse(department);
    return Ok(response);
  }

  [NonAction]
  private static DepartmentResponse GetResponse(Department department)
  {
    return new DepartmentResponse(
        department.DeptId,
        department.Name,
        department.ManagerId,
    new ManagerResponse(
      (int)department.ManagerId,
       new EmployeePartialResponse(
        department.Manager.Employee.EmpId,
        department.Manager.Employee.FirstName,
        department.Manager.Employee.LastName,
        department.Manager.Employee.TelNo,
        department.Manager.Employee.Email,
        null,
        department.Manager.Employee?.ManagerId,
        department.Manager.Employee?.DeptId,
        department.Manager.Employee.Status)
    ),
        department.Status);
  }

  [NonAction]
  private static List<DepartmentResponse> GetListResponse(List<Department> departments)
  {
    var list = new List<DepartmentResponse>();
    foreach (var department in departments)
    {
      list.Add(new DepartmentResponse(
        department.DeptId,
        department.Name,
        department.ManagerId,
    new ManagerResponse(
      (int)department.ManagerId,
       new EmployeePartialResponse(
        department.Manager.Employee.EmpId,
        department.Manager.Employee.FirstName,
        department.Manager.Employee.LastName,
        department.Manager.Employee.TelNo,
        department.Manager.Employee.Email,
        null,
        department.Manager.Employee?.ManagerId,
        department.Manager.Employee?.DeptId,
        department.Manager.Employee.Status)
    ),
        department.Status));
    }
    return list;
  }

  [NonAction]
  private static Department CreateDepartment(CreateEditDepartmentRequest request)
  {
    return new Department
    {
      Name = request.Name,
      ManagerId = request.ManagerId == 0 ? null : request.ManagerId,
      Status = true,
    };
  }
  [NonAction]
  private static Department UpdateDepartment(int id, CreateEditDepartmentRequest request)
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

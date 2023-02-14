using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using testproject.api.Models;
using testproject.api.Services;
using testproject.models.Employees;
using testproject.models.Roles;

namespace testproject.api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
  private readonly IEmployeeService _employeeService;
  private readonly IManagerService _managerService;
  private readonly IHRService _hrService;
  public EmployeesController(IEmployeeService employeeService, IManagerService managerService, IHRService hrService)
  {
    _employeeService = employeeService;
    _managerService = managerService;
    _hrService = hrService;
  }

  [HttpGet]
  [Authorize(Roles = "Manager, HR")]
  public IActionResult GetAllEmployee()
  {
    List<Employee> employees = _employeeService.GetAllEmployees();
    return Ok(employees);
  }

  [HttpGet("{id:int}")]
  [Authorize(Roles = "Employee, Manager, HR")]
  public IActionResult GetSingleEmployee(int id)
  {
    Employee employee = _employeeService.GetEmployee(id);
    var response = EmpResponse(employee);
    return Ok(response);
  }

  [HttpGet("managers")]
  [Authorize(Roles = "Managers, HR")]
  public IActionResult GetManagers()
  {
    List<Manager> managers = _managerService.GetAllManagers();
    return Ok(managers);
  }

  [HttpGet("managers/{id:int}")]
  [Authorize(Roles = "Managers, HR")]
  public IActionResult GetSingleManager(int id)
  {
    var managers = _managerService.GetSingleManager(id);
    var response =
    new EmployeePartialResponse(
      managers.EmpId,
      managers.Employee.FirstName,
      managers.Employee.LastName,
      managers.Employee.TelNo,
      managers.Employee.Email,
      new RoleResponse(
        managers.Employee.Role.RoleID,
        managers.Employee.Role.Name
        ),
      managers.ManagerId,
      managers.Employee.DeptId,
      managers.Employee.Status
      );
    return Ok(response);
  }

  [HttpGet("hr")]
  [Authorize(Roles = "Managers, HR")]
  public IActionResult GetHrs()
  {
    List<HR> hrs = _hrService.GetAllHRs();
    return Ok(hrs);
  }

  [HttpGet("hr/{id:int}")]
  [Authorize(Roles = "Managers, HR")]
  public IActionResult GetSingleHr(int id)
  {
    var hr = _hrService.GetSingleHR(id);
    var response =
    new EmployeePartialResponse(
      hr.EmpId,
      hr.Employee.FirstName,
      hr.Employee.LastName,
      hr.Employee.TelNo,
      hr.Employee.Email,
      new RoleResponse(
        hr.Employee.Role.RoleID,
        hr.Employee.Role.Name
        ),
      hr.Employee.ManagerId,
      hr.Employee.DeptId,
      hr.Employee.Status
      );
    return Ok(response);
  }

  [HttpPost("{id:int?}")]
  [Authorize(Roles = "Manager, HR")]
  public IActionResult CreateEditEmployee(int id, CreateEditEmployeeRequest request)
  {
    var employee = new Employee();
    if (id != 0)
      employee = UpdateEmployee(id, request);
    else
      employee = CreateEmployee(request);

    _employeeService.CreateEditEmployee(id, employee);
    var response = _employeeService.GetEmployee(employee.EmpId);
    if (response.RoleID == 2 || response.RoleID == 3)
      _employeeService.AssignAuto(response.EmpId, response.RoleID);

    return CreatedAtAction(
        nameof(GetSingleEmployee),
        routeValues: new { id = response?.EmpId },
        response
    );
  }

  [HttpDelete("{id:int}")]
  [Authorize(Roles = "Manager, HR")]
  public IActionResult DeleteEmployee(int id)
  {
    _employeeService.DeleteEmployee(id);
    return Ok();
  }

  [NonAction]
  private static Employee CreateEmployee(CreateEditEmployeeRequest request)
  {
    return new Employee
    {
      FirstName = request.FirstName,
      LastName = request.LastName,
      Email = request.Email,
      TelNo = request.TelNo,
      RoleID = request.RoleID,
      Password = request.Password == "" ? "myPass123" : request.Password,
      ManagerId = request.ManagerId == 0 ? null : request.ManagerId,
      DeptId = request.DeptId == 0 ? null : request.ManagerId,
      Status = request.Status
    };
  }
  [NonAction]
  private static Employee UpdateEmployee(int id, CreateEditEmployeeRequest request) =>
  new Employee
  {
    EmpId = id,
    FirstName = request.FirstName,
    LastName = request.LastName,
    Email = request.Email,
    TelNo = request.TelNo,
    RoleID = request.RoleID,
    Password = request.Password,
    ManagerId = request.ManagerId == 0 ? null : request.ManagerId,
    DeptId = request.DeptId == 0 ? null : request.ManagerId,
    Status = request.Status
  };

  [NonAction]
  private static EmployeePartialResponse EmpResponse(Employee employee) =>
  new EmployeePartialResponse(
          employee.EmpId,
          employee.FirstName,
          employee.LastName,
          employee.TelNo,
          employee.Email,
          new RoleResponse(
            employee.Role.RoleID,
            employee.Role.Name
            ),
          employee.ManagerId,
          employee.DeptId,
          employee.Status
    );
}

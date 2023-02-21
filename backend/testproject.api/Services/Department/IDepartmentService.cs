using testproject.api.Models;

namespace testproject.api.Services;

public interface IDepartmentService
{
  List<Department> GetAllDepartments();
  Department GetDepartment(int id);
  void CreateEditDepartment(int id, Department department);
  void UpdateDepartmentStatus(Department department);
}

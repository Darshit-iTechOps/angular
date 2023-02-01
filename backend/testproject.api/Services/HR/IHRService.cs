using testproject.api.Models;

namespace testproject.api.Services;
public interface IHRService
{
  List<HR> GetAllHRs();
  HR GetSingleHR(int id);
}

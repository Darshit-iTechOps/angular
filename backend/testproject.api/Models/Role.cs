using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace testproject.api.Models;

[Table("role")]
public class Role
{
  [Key]
  public int RoleID { get; set; }
  public string Name { get; set; }

  public Role(int roleID, string name)
  {
    RoleID = roleID;
    Name = name;
  }
}

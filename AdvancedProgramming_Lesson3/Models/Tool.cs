using System.ComponentModel.DataAnnotations;

namespace AdvancedProgramming_Lesson3.Models
{
    public class Tool
    {
        public int Id { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public string Condition { get; set; }
       

    }
}

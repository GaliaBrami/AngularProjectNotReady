using System.Xml.Linq;

namespace BasicAPI.toArace
{
    public class Student
    {
        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string addres { get; set; }
        public int avg { get; set; }
        public bool status { get; set; }
        public string tel { get; set; }
        public DateTime dateFinish { get; set; }
        public int maslulId { get; set; }
        public Test[] tests { get; set; }
        public MissingDays[] missingDays { get; set; }
        public string mail { get; set; }
        public Student(string name)
        {
            id = 0;
            firstName = name;
            status = true;
            tests = null;
            missingDays = null;

        }
    }
}

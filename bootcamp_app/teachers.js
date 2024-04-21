const { Pool } = require("pg");

const cohortName = process.argv[2];

const values = [`%${cohortName}%`];

const pool = new Pool({
    user: "development",
    password: "development",
    host: "localhost",
    database: "bootcampx",
    port: 5432,
});

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1 || "JUL02"}'
ORDER BY teacher;
`;

pool.queryString(queryString, values).then(res => {
    res.rows.forEach(row => {
        console.log(`${row.cohort}: ${row.teacher}`);
    });
});

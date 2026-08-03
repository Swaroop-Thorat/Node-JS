const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");

// ─── Paths ────────────────────────────────────────────────────────────────────
const STUDENTS_FILE = path.join(__dirname, "students.json");
const BACKUP_FILE   = path.join(__dirname, "students_backup.json");
const LOGS_DIR      = path.join(__dirname, "logs");
const LOG_FILE      = path.join(LOGS_DIR, "server.log");

// ─── Boot-time setup ──────────────────────────────────────────────────────────
function ensureFiles() {
  // Ensure logs/ directory exists
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }

  // Ensure students.json exists
  if (!fs.existsSync(STUDENTS_FILE)) {
    fs.writeFileSync(STUDENTS_FILE, "[]", "utf-8");
  }
}

ensureFiles();

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Append a line to logs/server.log */
function logRequest(method, url) {
  const now    = new Date();
  const day    = String(now.getDate()).padStart(2, "0");
  const month  = String(now.getMonth() + 1).padStart(2, "0");
  const year   = now.getFullYear();
  const hours  = String(now.getHours()).padStart(2, "0");
  const mins   = String(now.getMinutes()).padStart(2, "0");
  const line   = `${day}-${month}-${year} ${hours}:${mins} ${method} ${url}\n`;
  fs.appendFileSync(LOG_FILE, line, "utf-8");
}

/** Read students.json and return parsed array */
function readStudents(callback) {
  fs.readFile(STUDENTS_FILE, "utf-8", (err, data) => {
    if (err) return callback(err, null);
    try {
      callback(null, JSON.parse(data));
    } catch (e) {
      callback(e, null);
    }
  });
}

/** Write array back to students.json */
function writeStudents(students, callback) {
  fs.writeFile(STUDENTS_FILE, JSON.stringify(students, null, 2), "utf-8", callback);
}

/** Send a JSON response */
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, null, 2));
}

/** Parse request body */
function parseBody(req, callback) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    try {
      callback(null, body ? JSON.parse(body) : {});
    } catch (e) {
      callback(e, null);
    }
  });
}

// ─── Router ───────────────────────────────────────────────────────────────────

const server = http.createServer((req, res) => {
  const method = req.method;
  const rawUrl = req.url;

  // Split pathname and query string
  const [pathname, queryString] = rawUrl.split("?");
  const query = {};
  if (queryString) {
    queryString.split("&").forEach((pair) => {
      const [k, v] = pair.split("=");
      if (k) query[decodeURIComponent(k)] = decodeURIComponent(v || "");
    });
  }

  // Log every request
  logRequest(method, rawUrl);

  // ── GET / ──────────────────────────────────────────────────────────────────
  if (method === "GET" && pathname === "/") {
    return sendJSON(res, 200, { message: "Assessment Running" });
  }

  // ── GET /system ────────────────────────────────────────────────────────────
  if (method === "GET" && pathname === "/system") {
    return sendJSON(res, 200, {
      osName:          os.type(),
      platform:        os.platform(),
      cpuArchitecture: os.arch(),
      totalMemory:     os.totalmem(),
      freeMemory:      os.freemem(),
      homeDirectory:   os.homedir(),
      currentFileName: path.basename(__filename),
      currentFolder:   path.basename(__dirname),
    });
  }

  // ── POST /student ──────────────────────────────────────────────────────────
  if (method === "POST" && pathname === "/student") {
    return parseBody(req, (err, body) => {
      if (err) return sendJSON(res, 400, { success: false, message: "Invalid Data" });

      const { name, age, course } = body;

      // Validation
      if (!name || age === undefined || age === null || !course || Number(age) <= 15) {
        return sendJSON(res, 400, { success: false, message: "Invalid Data" });
      }

      readStudents((err, students) => {
        if (err) return sendJSON(res, 500, { success: false, message: "Server Error" });

        const newStudent = {
          id:     students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1,
          name:   String(name).trim(),
          age:    Number(age),
          course: String(course).trim(),
        };

        students.push(newStudent);

        writeStudents(students, (err) => {
          if (err) return sendJSON(res, 500, { success: false, message: "Server Error" });
          return sendJSON(res, 201, { success: true, message: "Student Registered" });
        });
      });
    });
  }

  // ── GET /students ──────────────────────────────────────────────────────────
  if (method === "GET" && pathname === "/students") {
    return readStudents((err, students) => {
      if (err) return sendJSON(res, 500, { message: "Server Error" });
      return sendJSON(res, 200, students);
    });
  }

  // ── GET /search?course=xxx ─────────────────────────────────────────────────
  if (method === "GET" && pathname === "/search") {
    const { course } = query;
    return readStudents((err, students) => {
      if (err) return sendJSON(res, 500, { message: "Server Error" });
      if (!course) return sendJSON(res, 400, { message: "Provide course query param" });

      const result = students.filter((s) =>
        s.course.toLowerCase().includes(course.toLowerCase())
      );
      return sendJSON(res, 200, result);
    });
  }

  // ── GET /filter?minAge=xx ──────────────────────────────────────────────────
  if (method === "GET" && pathname === "/filter") {
    const minAge = Number(query.minAge);
    return readStudents((err, students) => {
      if (err) return sendJSON(res, 500, { message: "Server Error" });
      if (isNaN(minAge)) return sendJSON(res, 400, { message: "Provide valid minAge query param" });

      const result = students.filter((s) => s.age >= minAge);
      return sendJSON(res, 200, result);
    });
  }

  // ── GET /report ────────────────────────────────────────────────────────────
  if (method === "GET" && pathname === "/report") {
    return readStudents((err, students) => {
      if (err) return sendJSON(res, 500, { message: "Server Error" });

      const totalStudents = students.length;
      const averageAge =
        totalStudents === 0
          ? 0
          : Math.round(
              (students.reduce((sum, s) => sum + s.age, 0) / totalStudents) * 100
            ) / 100;
      const courses = [...new Set(students.map((s) => s.course))];

      return sendJSON(res, 200, { totalStudents, averageAge, courses });
    });
  }

  // ── GET /download-path ─────────────────────────────────────────────────────
  if (method === "GET" && pathname === "/download-path") {
    return sendJSON(res, 200, {
      absolutePath:  STUDENTS_FILE,
      fileExtension: path.extname(STUDENTS_FILE),
      fileName:      path.basename(STUDENTS_FILE),
      parentFolder:  path.dirname(STUDENTS_FILE),
    });
  }

  // ── POST /backup ───────────────────────────────────────────────────────────
  if (method === "POST" && pathname === "/backup") {
    return readStudents((err, students) => {
      if (err) return sendJSON(res, 500, { message: "Server Error" });

      fs.writeFile(BACKUP_FILE, JSON.stringify(students, null, 2), "utf-8", (err) => {
        if (err) return sendJSON(res, 500, { message: "Backup Failed" });
        return sendJSON(res, 200, {
          success: true,
          message: "Backup Created",
          backupPath: BACKUP_FILE,
        });
      });
    });
  }

  // ── BONUS: GET /student/:id/report ────────────────────────────────────────
  const bonusMatch = pathname.match(/^\/student\/(\d+)\/report$/);
  if (method === "GET" && bonusMatch) {
    const id = Number(bonusMatch[1]);
    return readStudents((err, students) => {
      if (err) return sendJSON(res, 500, { message: "Server Error" });

      const student = students.find((s) => s.id === id);
      if (!student) return sendJSON(res, 404, { message: "Student Not Found" });

      return sendJSON(res, 200, {
        student,
        system: {
          platform: os.platform(),
          cpu:      os.arch(),
        },
        serverTime: new Date().toISOString(),
      });
    });
  }

  // ── GET /student/:id ───────────────────────────────────────────────────────
  const idMatch = pathname.match(/^\/student\/(\d+)$/);
  if (method === "GET" && idMatch) {
    const id = Number(idMatch[1]);
    return readStudents((err, students) => {
      if (err) return sendJSON(res, 500, { message: "Server Error" });

      const student = students.find((s) => s.id === id);
      if (!student) return sendJSON(res, 404, { message: "Student Not Found" });
      return sendJSON(res, 200, student);
    });
  }

  // ── 404 ────────────────────────────────────────────────────────────────────
  return sendJSON(res, 404, { message: "Route Not Found" });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const DB_PATH = path.join(process.cwd(), "data", "users.json");

/**
 * Ensure the data directory and users.json file exist
 */
function ensureDB() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
  }
}

/**
 * Read all users from the JSON file
 */
export function getUsers() {
  ensureDB();
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
}

/**
 * Write users array to the JSON file
 */
function saveUsers(users) {
  ensureDB();
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

/**
 * Find a user by email
 */
export function findUserByEmail(email) {
  const users = getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

/**
 * Find a user by ID
 */
export function findUserById(id) {
  const users = getUsers();
  return users.find((u) => u.id === id);
}

/**
 * Create a new user and return it (without the password hash)
 */
export function createUser({ name, email, hashedPassword }) {
  const users = getUsers();

  const newUser = {
    id: uuidv4(),
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    role: "USER",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  // Return user without password
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

/**
 * Store a password reset code for a user
 */
export function storeResetCode(email, code) {
  const users = getUsers();
  const userIndex = users.findIndex(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (userIndex === -1) return false;

  users[userIndex].resetCode = code;
  users[userIndex].resetCodeExpiry = new Date(
    Date.now() + 15 * 60 * 1000 // 15 minutes
  ).toISOString();

  saveUsers(users);
  return true;
}

/**
 * Verify a reset code for a user
 */
export function verifyResetCode(email, code) {
  const user = findUserByEmail(email);
  if (!user) return false;
  if (!user.resetCode || !user.resetCodeExpiry) return false;
  if (new Date(user.resetCodeExpiry) < new Date()) return false;
  return user.resetCode === code;
}

/**
 * Update user profile fields (firstName, middleName, lastName, phone, dob, address)
 */
export function updateUserProfile(userId, profileData) {
  const users = getUsers();
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) return null;

  // Merge profile fields
  Object.assign(users[userIndex], {
    firstName: profileData.firstName ?? users[userIndex].firstName ?? "",
    middleName: profileData.middleName ?? users[userIndex].middleName ?? "",
    lastName: profileData.lastName ?? users[userIndex].lastName ?? "",
    phone: profileData.phone ?? users[userIndex].phone ?? "",
    dob: profileData.dob ?? users[userIndex].dob ?? "",
    address: profileData.address ?? users[userIndex].address ?? "",
  });

  // Also update the display name
  const nameParts = [profileData.firstName, profileData.middleName, profileData.lastName].filter(Boolean);
  if (nameParts.length > 0) {
    users[userIndex].name = nameParts.join(" ");
  }

  saveUsers(users);

  const { password, resetCode, resetCodeExpiry, ...safeUser } = users[userIndex];
  return safeUser;
}

/**
 * Update user password and clear reset code
 */
export function updatePassword(email, hashedPassword) {
  const users = getUsers();
  const userIndex = users.findIndex(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (userIndex === -1) return false;

  users[userIndex].password = hashedPassword;
  delete users[userIndex].resetCode;
  delete users[userIndex].resetCodeExpiry;

  saveUsers(users);
  return true;
}

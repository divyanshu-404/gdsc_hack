const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
const background = document.getElementById("background");
const loginForms = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const invalidMessage = document.getElementById("fail");

signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
};
loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
};
signupLink.onclick = () => {
  signupBtn.click();
  return false;
};

const users = [
  { username: "divyanshu-404", password: "@loha" },
  { username: "Divyanshu", password: "gdschack" },
];

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const enteredUsername = usernameInput.value.trim();
  const enteredPassword = passwordInput.value.trim();

  const matchedUser = users.find(
    (user) =>
      user.username === enteredUsername && user.password === enteredPassword
  );
  if (matchedUser) {
    invalidMessage.style.display = "none";
    localStorage.setItem("currentUser", JSON.stringify(matchedUser));
    window.location.href = "./../home page/home_page.html";
  } else {
    invalidMessage.style.display = "block";
  }
});

document.addEventListener("mousemove", function (e) {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  const moveX = x * 15 - 15;
  const moveY = y * 15 - 15;
  background.style.backgroundPosition = `${moveX}px ${moveY}px`;
});

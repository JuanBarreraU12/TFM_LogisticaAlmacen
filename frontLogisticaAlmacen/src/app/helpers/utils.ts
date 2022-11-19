import { Injectable } from "@angular/core";
import { Login } from "../interfaces/login.interface";


export class Utils {
  static getSession()
  {
    let user : Login = JSON.parse(localStorage.getItem("user") || '{}');
    return user;
  }
}

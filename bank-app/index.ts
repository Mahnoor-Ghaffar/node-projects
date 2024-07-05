#! /usr/bin/env node

import { faker } from "@faker-js/faker";
 import chalk from "chalk";
//const chalk = require("chalk");
import inquirer from "inquirer";


class Customer {
    firstName : string
    lastName : string
    age : number
    gender : string
    mobNumber : number
    accNumber : number

    constructor (
        fNmae:string,
        lName:string,
        age:number,
        gender:string,
        mob:number,
        acc:number
    ) {
        this.firstName = fNmae;
        this.lastName = lName;
        this.age = age;
        this.gender = gender;
        this.mobNumber = mob;
        this.accNumber = acc;
    }
}

//interface BankAccount
interface BankAccount {
    accNumber : number,
    balance : number,
}

//Class Bank
class Bank {
    customer : Customer[] = [];
    account : BankAccount[] = [];

    addCustomer(obj:Customer) {
    this.customer.push(obj);
    }

    addAccountNumber (obj:BankAccount) {
        this.account.push(obj);
    }
    transaction(accObj : BankAccount) {
        let NewAccounts = this.account.filter(
            (acc) => acc.accNumber ! == accObj.accNumber
        );
        this.account = [...NewAccounts,accObj];
    }
}

let myBank = new Bank();

//customer Create
for (let i:number = 1; i <= 3; i++) {
    let fNmae = faker.person.firstName('male');
    let lName = faker.person.lastName();
    let num = parseInt(faker.phone.number("3#########"));
    const cus = new Customer(fNmae,lName,25*i,'male',num, 1000 + i);
    myBank.addCustomer(cus);
    myBank.addAccountNumber({accNumber: cus.accNumber,balance:1000*i})
}

//Bank Functionality
async function bankServices(bank : Bank) {
    do{
        let service = await inquirer.prompt({
            type : "list",
            name : "select",
            message : "please Select the Service",
            choices : ["View Balance", "Cash Withdraw","Cash Deposit","Exit"]
        })
    
        //View Balance
        if (service.select == "View Balance") {
            let res = await inquirer.prompt({
                type :"input",
                name : "num",
                message : "Please Enter Your Account Number"
            });
            let account = myBank.account.find((acc) => acc.accNumber == res.num);
            if (!account) {
                console.log(chalk.red.bold("Invalid Account Number"));  
            }
            if (account) {
                let name = myBank.customer.find(
                    (item) => item.accNumber == account?.accNumber
                );
                console.log(
                    `${chalk.green.bold(name?.firstName)} ${chalk.green.bold(name?.lastName)} Your Account Balance is ${chalk.bold.blueBright(`$${account.balance}`)}`);
            }
        }
    
        //Cash Withdraw
        if (service.select == "Cash Withdraw") {
            let res = await inquirer.prompt({
                type :"input",
                name : "num",
                message : "Please Enter Your Account Number"
            });
            let account = myBank.account.find((acc) => acc.accNumber == res.num);
            if (!account) {
                console.log(chalk.red.bold("Invalid Account Number"));  
            }
            if (account) {
                let ans = await inquirer.prompt({
                    type : "number",
                    message : "Please Enter Your Amount.",
                    name : "rupee"
                });
                let newBalance = account.balance - ans.rupee;
                //Transaction method call
                bank.transaction({accNumber:account.accNumber, balance:newBalance})
                if(ans.rupee  > account.balance) {
                    console.log(chalk.bold.red(`Your current balance is $${account.balance}. Unfortunately, this is insufficient to complete the transaction.`));
                } else {
                    console.log(`your remaining balance is $${newBalance}`);
                }
            }
        }
    
        //Cash Deposit
        if (service.select == "Cash Deposit") {
            let res = await inquirer.prompt({
                type :"input",
                name : "num",
                message : "Please Enter Your Account Number"
            });
            let account = myBank.account.find((acc) => acc.accNumber == res.num);
            if (!account) {
                console.log(chalk.red.bold("Invalid Account Number"));  
            }
            if (account) {
                let ans = await inquirer.prompt({
                    type : "number",
                    message : "Please Enter Your Amount.",
                    name : "rupee"
                });
                let newBalance = account.balance + ans.rupee;
                //Transaction method call
                bank.transaction({accNumber:account.accNumber, balance:newBalance})
            console.log(`your new balance is $${newBalance}`);
            
            }
        }
        if (service.select == "Exit") {
            console.log(`Thank you for banking with us. We look forward to serving you again.`);
            return;
        }
    }
    while(true)
    }
    
    

bankServices(myBank)

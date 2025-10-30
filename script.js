const textInput = document.querySelector("#text-input");
const amountInput = document.querySelector("#amount");
var transaction = "";
var totalIncome = 0;
var totalExpense = 0;
var balance = 0;
var textInputValue = "";
var amountInputValue = 0;
var index = 0;

function TransactionDescription(description, amount, status) {
    this.description = description;
    this.amount = amount;
    this.status = status;
    this.total = function() {
        if (this.status === "green") {
            if (totalIncome < 1) {
                return totalIncome = parseInt(this.amount);
            } else {
                return totalIncome = parseInt(totalIncome) + parseInt(this.amount);
            }
        } else {
            if (totalExpense < 1) {
                return totalExpense = parseInt(this.amount);
            } else {
                return totalExpense = parseInt(totalExpense) + parseInt(this.amount);
            }
        }
    }
    this.balance = function() {
        return balance = totalIncome - totalExpense;
    }
    this.clear = function() {
        this.description = "";
        this.amount = 0;
        this.status = "";
    }
}

function resetAll() {
    textInput.value = "";
    amountInput.value = "";
    textInputValue = "";
    amountInputValue = "";
    transaction.clear();
}

function checkInputValidity(status) {
    if (textInputValue === null || textInputValue.trim() === "") {
        alert("Please Enter description");
        textInput.focus();
        return;
    } else if (amountInputValue == null || amountInputValue === 0) {
        alert("Please Enter amount");
        amountInput.focus();
        return;
    } else if (Number.isNaN(amountInputValue)) {
        resetAll();
        alert("Please Enter valid amount");
        amountInput.focus();
    } else {
        if (status === "green") {
            transaction = new TransactionDescription(textInputValue, amountInputValue, status);
        } else {
            transaction = new TransactionDescription(textInputValue, amountInputValue, status);
        }
        displayResult(transaction);
    }
}

function displayResult(transaction) {
    const transactionGroup = document.querySelector(".transactions");

    var createdTransaction = document.createElement("div");
    createdTransaction.className = "transaction" + index;
    transactionGroup.appendChild(createdTransaction);
    transactionGroup.classList.add("transactions-flex");
    
    var createdDescription = document.createElement("div");
    createdDescription.className = "description" + index;
    document.querySelector(".transaction" + index).appendChild(createdDescription);
    document.querySelector(".transaction" + index).classList.add("transaction-flex");
    
    var createdText = document.createElement("p");
    createdText.className = "t-text" + index;
    document.querySelector(".description" + index).appendChild(createdText);
    document.querySelector(".t-text" + index).innerHTML = transaction.description;
    document.querySelector(".description" + index).classList.add("description-flex");
    document.querySelector(".description" + index).classList.add("left-width");

    var createdAmount = document.createElement("p");
    createdAmount.className = "t-amount" + index;
    document.querySelector(".description" + index).appendChild(createdAmount);
  
    var createdBox = document.createElement("div");
    createdBox.className = "status-credit" + index;
    document.querySelector(".transaction" + index).appendChild(createdBox);

    if (transaction.status === "green") {
        document.querySelector(".t-amount" + index).innerHTML = "+ $" + transaction.amount;
        document.querySelector(".status-credit" + index).innerHTML = "I";
        document.querySelector(".status-credit" + index).classList.add("green");
        totalIncome = transaction.total();
        document.querySelector("#income").innerHTML = "$" + totalIncome;
    } else {
        document.querySelector(".t-amount" + index).innerHTML = "- $" + transaction.amount;
        document.querySelector(".status-credit" + index).innerHTML = "E";
        document.querySelector(".status-credit" + index).classList.add("red");
        totalExpense = transaction.total();
        document.querySelector("#expense").innerHTML = "$" + totalExpense;
    }

    balance = transaction.balance();
    document.querySelector("#net-amount").innerHTML = "$" + balance;
    
    resetAll();
    index += 1;
}

document.querySelector("#text-input").addEventListener("keyup", function(e) {
    if (textInput.value !== null && textInput.value !== "") {
        textInputValue = textInput.value;
    }
});

document.querySelector("#amount").addEventListener("keyup", function(e) {
    if (amountInput.value !== null && amountInput.value !== 0) {
        amountInputValue = parseInt(amountInput.value);
    }
});

document.querySelector("#income-btn").addEventListener("click", function() {
    checkInputValidity("green");
});

document.querySelector("#expense-btn").addEventListener("click", function() {
    checkInputValidity("red");
});

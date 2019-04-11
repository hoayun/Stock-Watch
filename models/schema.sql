DROP DATABASE IF EXISTS daily_stocksDB;
CREATE DATABASE daily_stocksDB;

USE daily_stocksDB;

CREATE TABLE daily1000 (
    id INT AUTO_INCREMENT PRMARY KEY,
    position INT NOT NULL,
    companyName VARCHAR(255),
    symbol VARCHAR(255),
    open DECIMAL(10,4 )NULL,
    high DECIMAL (10,4) NULL,
    low DECIMAL (10,4)NULL,
    close DECIMAL (10,4) NULL,
    volume DECIMAL (10,4) NULL,
    dividend_amount DECIMAL (10,4) NULL,
    PRIMARY KEY (id)
);
-- Creates a new database
CREATE CLASS Person EXTENDS V;
CREATE CLASS OnlineAccount EXTENDS V;
CREATE CLASS account EXTENDS E;

INSERT INTO Person (firstName) VALUES ('Yonatan');
INSERT INTO OnlineAccount (accountName, accountServiceHomepage) VALUES
    ('yonatan.broza', 'https://www.facebook.com/');
CREATE EDGE account (SELECT FROM Person WHERE firstName = 'Yonatan') to 
    (SELECT FROM OnlineAccount WHERE accountName = 'yonatan.broza');

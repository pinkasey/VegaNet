-- Creates classes
CREATE CLASS Person EXTENDS V;
CREATE CLASS OnlineAccount EXTENDS V;
CREATE CLASS account EXTENDS E;
CREATE CLASS influencedBy EXTENDS E;

-- Creates persons
INSERT INTO Person (firstName) VALUES ('Yonatan');
INSERT INTO OnlineAccount (accountName, accountServiceHomepage) VALUES
    ('yonatan.broza', 'https://www.facebook.com/');
CREATE EDGE account FROM (SELECT FROM Person WHERE firstName = 'Yonatan') TO
    (SELECT FROM OnlineAccount WHERE accountName = 'yonatan.broza');

INSERT INTO Person (firstName) VALUES ('Eyal');
INSERT INTO OnlineAccount (accountName, accountServiceHomepage) VALUES
    ('pinkasey', 'https://www.facebook.com/');
CREATE EDGE account FROM (SELECT FROM Person WHERE firstName = 'Eyal') TO
    (SELECT FROM OnlineAccount WHERE accountName = 'pinkasey');

INSERT INTO Person (firstName) VALUES ('Alon');
INSERT INTO OnlineAccount (accountName, accountServiceHomepage) VALUES
    ('allonr', 'https://www.facebook.com/');
CREATE EDGE account FROM (SELECT FROM Person WHERE firstName = 'Alon') TO
    (SELECT FROM OnlineAccount WHERE accountName = 'allonr');

-- Creates veganizing relationships
CREATE EDGE influencedBy
    FROM (SELECT FROM Person WHERE firstName = 'Yonatan')
    TO (SELECT FROM Person WHERE firstName = 'Eyal');
CREATE EDGE influencedBy
    FROM (SELECT FROM Person WHERE firstName = 'Eyal')
    TO (SELECT FROM Person WHERE firstName = 'Alon');

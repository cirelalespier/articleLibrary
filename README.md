# articleLibrary
Search articles from news sources and blogs across the web.

The [newsAPI](https://newsapi.org/) provide the access to library article.

For issues, contact: lespier.cirela@gmail.com.

## Métodos
API's request:
| Method | Description |
|---|---|
| `GET` | Return articles by theme. |

## Responses

| Código | Descrição |
|---|---|
| `200` | Success.|
| `500` | Internal Server Error.|
| `404` | Not Found.|

## GET
The HTTP method GET return the articles by theme.

| Parameter | Description |
|---|---|
| `q` (required, string, "author") | Filter articles by theme informed. |

### Article List [GET]

+ Request (application/json)

+ Response 200 (application/json)

[
    {
        "author": "Karissa Bell",
        "title": "Elon Musk subpoenas Jack Dorsey amid Twitter legal fight",
        "description": "Lawyers representing Elon Musk in his battle with Twitter have subpoenaed\r\n former CEO Jack Dorsey. The filing is the latest development as Musk and Twitter prepare for the October trial over Musk’s attempt to bail on his $44 billion deal to buy the company.I…"
    },
    {
        "author": "Steve Dent",
        "title": "Elon Musk has a backup plan to kill his Twitter takeover",
        "description": "Elon Musk has filed an updated notice to kill his $44 billion Twitter acquisition by citing whistleblower Peiter Zatko, Twitter's former head of security. In a filing to the US Securities and Exchange Commission (SEC), Musk alleged that Twitter \"has not compl…"
    }
]
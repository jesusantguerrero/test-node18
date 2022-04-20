import test from "node:test"
import assert from "node:assert"
import { getArticles } from "../libs/index.mjs"


test("getArticles", async t => {
    const articles = await getArticles("jesusantguerrero")
    assert.ok(articles.length > 1)
})

test("getArticles should fail", async t => {
    const articles = await getArticles("freesgengas")
    console.log(articles)
})
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

test("Array.findLastIndex saturday", async t => {
    const monthDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const dayCount = (weekDayName) => monthDays.filter(day => day === weekDayName).findLastIndex(day => day === weekDayName) + 1
    console.log(dayCount('saturday'))
    assert.equal(dayCount('saturday'), 1)
})
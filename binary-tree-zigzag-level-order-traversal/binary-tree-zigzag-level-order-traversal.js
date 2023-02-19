/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

// brute force
var zigzagLevelOrder = function(root) {
    if (!root) return [] // base case (there is no root)

    const a = [] // answer
    let q = [root] // queue initialized with root
    let ltr = true // left to right

    while (q.length) {
        const n = q.length
        const c = []
        const nq = [] // next queue
        if (ltr) {
            for (let i = 0; i < n; i++) {
                const node = q.shift()
                c.push(node.val)
                if (node.left !== null) nq.push(node.left)
                if (node.right !== null) nq.push(node.right)
            }
        } else {
            for (let i = 0; i < n; i++) {
                const node = q.pop()
                c.push(node.val)
                if (node.right !== null) nq.unshift(node.right)
                if (node.left !== null) nq.unshift(node.left)
            }
        }
        a.push(c)
        q = nq // 7 15 4 2
        ltr = !ltr
    }

    return a
};

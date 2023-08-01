'use strict'
const getHome = require('../../handler/home');

module.exports = async function(fastify, opts) {
    fastify.route({
        method: 'GET',
        url: '/',
        handler: getHome,
        schema: {
            summary: 'Return Home',
            description: 'Return to Home View and check non-used voucher',
            tags: ['Home'],
            response: {
                200: {
                    type: 'string',
                    example: `<!DOCTYPEhtml><htmllang="en"><head><metacharset="UTF-8"><title>VoucherSystemGenerator</title><!--CSS(loadbootstrapfromaCDN)--><linkrel="stylesheet"href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css"><style>body{padding-top:50px;}</style></head><bodyclass="container"><header><navclass="navbarnavbar-expand-lgnavbar-lightbg-light"><aclass="navbar-brand"href="/home">VoucherSystemGenerator</a><ulclass="navbar-navmr-auto"><liclass="nav-item"><aclass="nav-link"href="/home">Home</a></li></ul></nav></header><main><divclass="jumbotron"><h1>VoucherSystemGenerator</h1></div><divclass="row"><divclass="row"><formaction="/user/user-code"method="post"><divclass="form-group"><labelfor="exampleInputEmail1">PleaseInputyourusercode</label><inputname="user_code"class="form-control"placeholder="Entertitle"></div><buttontype="submit"class="btnbtn-primarymb-2">PostNow</button></form></div></div></main><footer></footer></body></html>`
                }
            }
        }
    });
}
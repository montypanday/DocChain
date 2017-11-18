import * as React from 'react';

interface FAQProp {
   
}
interface FAQState {

}
const pstyle = {
    paddingTop:'40px',
    paddingBottom: '40px',
    'width' : 'auto'
};
const big_font = {
    fontSize: '27px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px'

};
const sizing = {
    'width' : 'auto'
}
export class Faq extends React.Component<FAQProp, FAQState> {
    
    public render() {
        
        return <div >
            <div className="container" style={pstyle}>
                <div className="container" style={sizing}>
                    <div className="panel-group" id="accordion">
                        <div className="faqHeader" style={big_font}>General questions</div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Is account registration required?</a></h4></div>
                            <div id="collapseOne" className="panel-collapse collapse in">
                                <div className="panel-body">Account registration at<strong> PrepBootstrap </strong>is only required if you will be selling or buying themes. This ensures a valid communication channel for all parties involved in any transactions.</div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTen">Can I submit my own Bootstrap templates or themes?</a></h4></div>
                            <div id="collapseTen" className="panel-collapse collapse">
                                <div className="panel-body">A lot of the content of the site has been submitted by the community. Whether it is a commercial element/template/theme or a free one, you are encouraged to contribute. All credits are published along with the resources.</div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseEleven">What is the currency used for all transactions?</a></h4></div>
                            <div id="collapseEleven" className="panel-collapse collapse">
                                <div className="panel-body">All prices for themes, templates and other items, including each seller&#39;s or buyer&#39;s account balance are in<strong>USD</strong></div>
                            </div>
                        </div>
                        <div className="faqHeader" style={big_font}>Sellers</div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">Who cen sell items?</a></h4></div>
                            <div id="collapseTwo" className="panel-collapse collapse">
                                <div className="panel-body">Any registed user, who presents a work, which is genuine and appealing, can post it on<strong>PrepBootstrap</strong>.</div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">I want to sell my items - what are the steps?</a></h4></div>
                            <div id="collapseThree" className="panel-collapse collapse">
                                <div className="panel-body">The steps involved in this process are really simple. All you need to do is:
                        <ul>
                                        <li>Register an account</li>
                                        <li>Activate your account</li>
                                        <li>Go to the<strong>Themes</strong>section and upload your theme</li>
                                        <li>The next step is the approval step, which usually takes about 72 hours.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFive">How much do I get from each sale?</a></h4></div>
                            <div id="collapseFive" className="panel-collapse collapse">
                                <div className="panel-body">Here, at<strong>PrepBootstrap</strong>, we offer a great, 70% rate for each seller, regardless of any restrictions, such as volume, date of entry, etc.
                        <br />
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseSix">Why sell my items here?</a></h4></div>
                            <div id="collapseSix" className="panel-collapse collapse">
                                <div className="panel-body">There are a number of reasons why you should join us:
                        <ul>
                                        <li>A great 70% flat rate for your items.</li>
                                        <li>Fast response/approval times. Many sites take weeks to process a theme or template. And if it gets rejected, there is another iteration. We have aliminated this, and made the process very fast. It only takes up to 72 hours
                                for a template/theme to get reviewed.</li>
                                        <li>We are not an exclusive marketplace. This means that you can sell your items on<strong>PrepBootstrap</strong>, as well as on any other marketplate, and thus increase your earning potential.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseEight">What are the payment options?</a></h4></div>
                            <div id="collapseEight" className="panel-collapse collapse">
                                <div className="panel-body">The best way to transfer funds is via Paypal. This secure platform ensures timely payments and a secure environment.</div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseNine">When do I get paid?</a></h4></div>
                            <div id="collapseNine" className="panel-collapse collapse">
                                <div className="panel-body">Our standard payment plan provides for monthly payments. At the end of each month, all accumulated funds are transfered to your account. The minimum amount of your balance should be at least 70 USD.</div>
                            </div>
                        </div>
                        <div className="faqHeader" style={big_font}>Buyers</div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour">I want to buy a theme - what are the steps?</a></h4></div>
                            <div id="collapseFour" className="panel-collapse collapse">
                                <div className="panel-body">Buying a theme on<strong>PrepBootstrap</strong>is really simple. Each theme has a live preview. Once you have selected a theme or template, which is to your liking, you can quickly and securely pay via Paypal.
                        <br />Once the transaction is complete, you gain full access to the purchased product.</div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseSeven">Is this the latest version of an item</a></h4></div>
                            <div id="collapseSeven" className="panel-collapse collapse">
                                <div className="panel-body">Each item in<strong>PrepBootstrap</strong>is maintained to its latest version. This ensures its smooth operation.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

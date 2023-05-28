import { TextContract } from '../../components/contract/text-contract';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { NavMenu } from '../../components/nav-menu/nav-menu';

export const TermsPage = ({text}) => (
    <div className='terms-page'>
        <Header/>
        <div className="terms-page__content">
            
                <div className="container">
                    <div className="terms-page__content-wrapper">
                        <NavMenu/>

                        <div className="terms-page__content-block">
                            <h2 className='terms-page__content-header'>{ text }</h2>
                            <TextContract/>
                        </div>
                    </div>

                </div>
        </div>
        <Footer/>
    </div>
)
     
import Document, { DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";

// 이 오류는 서버 사이드 렌더링(SSR)과 클라이언트
// 사이드 렌더링(CSR) 사이에 발생하는 스타일의 불일치를 나타냅니다.
// Next.js는 기본적으로 모든 페이지를 서버에서 렌더링하고,
// 이후에 클라이언트에서 추가적인 렌더링을 수행합니다.
// 이 두 렌더링 사이에 일관성이 없는 경우, 위와 같은 오류가 발생할 수 있습니다.

// 이 오류는 styled-components를 사용할 때 특히 자주 발생하는데,
// 그 이유는 styled-components가 동적으로 클래스 이름을 생성하기 때문입니다.
// 이 문제를 해결하려면 서버와 클라이언트 모두에서 동일한 클래스 이름이 생성되도록 해야 합니다.

// Next.js에서는 클래스 컴포넌트로만 작성할 수 있다.
// Next의 특정 생명 주기메소드는 클래스 컴포넌트에서만 작동한다.

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }
}

package ca.ilanguage.communicationgame;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;

import ca.ilanguage.communicationgame.R;

public class AndroidCommunicationGameActivity extends Activity {
	private WebView mWebView;
	/** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_webview);
        mWebView = (WebView) findViewById(R.id.webview);
		mWebView.addJavascriptInterface(new JavaScriptInterface(this),
				"Android");

		WebSettings webSettings = mWebView.getSettings();
		webSettings.setBuiltInZoomControls(true);
		webSettings.setJavaScriptEnabled(true);
		webSettings.setUserAgentString(webSettings.getUserAgentString() + " "
				+ getString(R.string.user_agent_suffix));
		mWebView.loadUrl("file:///android_asset/webapp/main.html");
        
    }
	public class JavaScriptInterface {

		Context mContext;

		/** Instantiate the interface and set the context */
		JavaScriptInterface(Context c) {
			mContext = c;

		}

		public void showToast(String toast) {
			Toast.makeText(mContext, toast, Toast.LENGTH_LONG).show();
		}
	}
}
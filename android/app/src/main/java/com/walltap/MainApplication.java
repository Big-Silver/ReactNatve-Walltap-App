package com.walltap;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import io.fullstack.oauth.OAuthManagerPackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import io.realm.react.RealmReactPackage;
import cl.json.RNSharePackage;
import com.idehub.Billing.InAppBillingBridgePackage;
import com.goldenowl.twittersignin.TwitterSigninPackage;
import com.magus.fblogin.FacebookLoginPackage;

import com.twitter.sdk.android.Twitter;
import com.twitter.sdk.android.core.TwitterAuthConfig;
import io.fullstack.firestack.FirestackPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.sbugert.rnadmob.RNAdMobPackage;
import java.util.Arrays;
import java.util.List;
import com.facebook.FacebookSdk;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import com.twitter.sdk.android.Twitter;
import com.twitter.sdk.android.core.TwitterAuthConfig;
import io.fabric.sdk.android.Fabric;


public class MainApplication extends Application implements ReactApplication {

  // Note: Your consumer key and secret should be obfuscated in your source code before shipping.
  private static final String TWITTER_KEY = "kEr1wB0v2415xIRXrSO0jdz62";
  private static final String TWITTER_SECRET = "G8N9c6snF9omLebBTLxsPfU0fXsv7XTAkmsEgvnbEkZ2Kh8Tzx";


  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new OAuthManagerPackage(),
            new RNAdMobPackage(),
            new RealmReactPackage(),
            new RNSharePackage(),
          new InAppBillingBridgePackage(null),
          new FacebookLoginPackage(),
          new TwitterSigninPackage(),
          new FirestackPackage(),
          new RNAdMobPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    TwitterAuthConfig authConfig = new TwitterAuthConfig(TWITTER_KEY, TWITTER_SECRET);
    Fabric.with(this, new Crashlytics(), new Twitter(authConfig));
    SoLoader.init(this, /* native exopackage */ false);
  }
}

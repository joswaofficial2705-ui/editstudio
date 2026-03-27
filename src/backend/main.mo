import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Stripe "stripe/stripe";
import Iter "mo:core/Iter";
import AccessControl "authorization/access-control";
import OutCall "http-outcalls/outcall";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Core types
  type PackageId = Text;

  public type PricingPackage = {
    id : PackageId;
    name : Text;
    description : Text;
    priceInCents : Nat;
    features : [Text];
  };

  public type PortfolioItem = {
    title : Text;
    description : Text;
    category : Text;
    thumbnailUrl : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  // Persistent state
  let packages = Map.empty<PackageId, PricingPackage>();
  let portfolioItems = Map.empty<Text, PortfolioItem>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // PortfolioItem comparison by title for ordering
  module PortfolioItem {
    public func compare(a : PortfolioItem, b : PortfolioItem) : Order.Order {
      Text.compare(a.title, b.title);
    };
  };

  // Helper function for admin authorization
  func assertAdmin(caller : Principal) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
  };

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public queries - no authorization needed
  public query func getAllPackages() : async [PricingPackage] {
    packages.values().toArray();
  };

  public query func getPackage(id : PackageId) : async PricingPackage {
    switch (packages.get(id)) {
      case (null) { Runtime.trap("Package not found") };
      case (?pkg) { pkg };
    };
  };

  public query func getAllPortfolioItems() : async [PortfolioItem] {
    portfolioItems.values().toArray().sort();
  };

  // Admin-only mutations
  public shared ({ caller }) func addOrUpdatePackage(pkg : PricingPackage) : async () {
    assertAdmin(caller);
    packages.add(pkg.id, pkg);
  };

  public shared ({ caller }) func deletePackage(id : PackageId) : async () {
    assertAdmin(caller);
    if (not packages.containsKey(id)) { Runtime.trap("Package not found") };
    packages.remove(id);
  };

  public shared ({ caller }) func addOrUpdatePortfolioItem(item : PortfolioItem) : async () {
    assertAdmin(caller);
    portfolioItems.add(item.title, item);
  };

  public shared ({ caller }) func deletePortfolioItem(title : Text) : async () {
    assertAdmin(caller);
    if (not portfolioItems.containsKey(title)) { Runtime.trap("Portfolio item not found") };
    portfolioItems.remove(title);
  };

  // Stripe integration
  var configuration : ?Stripe.StripeConfiguration = null;

  public query func isStripeConfigured() : async Bool {
    configuration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    assertAdmin(caller);
    configuration := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (configuration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };
};
